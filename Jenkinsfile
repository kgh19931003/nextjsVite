pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy with Git Pull') {
            steps {
                script {
                    echo "🚀 원격 서버에서 git pull 실행 중..."

                    sh """
                        ssh -i '${env.SSH_KEY_PATH}' -o StrictHostKeyChecking=no ${env.REMOTE_USER}@${env.REMOTE_SERVER} '
                            cd ${env.PORTFOLIO_REMOTE_PATH} && \
                            git reset --hard && \
                            git pull origin main && \
                            echo "✅ git pull 완료"
                        '
                    """
                }
            }
        }

        stage('Run Post-Deployment Tasks') {
            steps {
                script {

                    sh """
                        ssh -i '${env.SSH_KEY_PATH}' -o StrictHostKeyChecking=no ${env.REMOTE_USER}@${env.REMOTE_SERVER} '
                            set -e
                            cd ${env.PORTFOLIO_REMOTE_PATH}

                            if git diff --name-only HEAD@{1} HEAD | grep -qE "package(-lock)?\\.json"; then
                                echo "📦 package.json 변경 감지됨 → npm install 실행"
                                npm install
                            else
                                echo "✅ package.json 변경 없음 → npm install 생략"
                            fi

                            sudo rm -rf .next
                            echo "🔨 항상 npm run build 실행"
                            if ! npm run build; then
                                echo "❌ 빌드 실패!"
                                exit 1
                            fi

                            sudo chown -R root:root .next
                        '
                    """

                    // 2. 배포 작업
                    echo "☁️ AWS 환경 → docker-compose 기반 배포 실행"
                    sh """
                    ssh -i '${env.SSH_KEY_PATH}' -o StrictHostKeyChecking=no ${env.REMOTE_USER}@${env.REMOTE_SERVER} '
                        set -e

                        cd ${env.DOCKER_COMPOSE_PATH}

                        # 5️⃣ 초기 도커 시스템 정리
                        docker system prune -a --volumes --force

                        # 기존 컨테이너가 3000 포트인지 확인
                        if docker ps --format "{{.Names}}:{{.Ports}}" | grep -q "portfolio.*0.0.0.0:3000"; then
                            NEW_PORT=3001
                        else
                            NEW_PORT=3000
                        fi

                        echo "▶ 새 컨테이너 임시 포트: \$NEW_PORT"

                        export CONTAINER_NAME=portfolio_new
                        echo "▶ 새 컨테이너: \$CONTAINER_NAME, 임시 포트: \$NEW_PORT"

                        # docker-compose로 새 컨테이너 빌드 및 실행
                        NEW_PORT=\$NEW_PORT CONTAINER_NAME=\$CONTAINER_NAME docker compose up -d --build portfolio_new

                        # 2️⃣ Health check
                        sleep 20
                        if ! curl -f http://localhost:\$NEW_PORT; then
                            echo "❌ 새 컨테이너 정상 아님"
                            docker logs portfolio_new
                            docker stop \$CONTAINER_NAME && docker rm \$CONTAINER_NAME
                            exit 1
                        fi


                        # 3️⃣ 기존 컨테이너 중지/삭제
                        if docker ps -a --format "{{.Names}}" | grep -q "^portfolio\$"; then
                            docker stop portfolio
                            docker rm portfolio
                        fi

                        docker rename \$CONTAINER_NAME portfolio

                        # 5️⃣ 도커 시스템 정리
                        docker system prune -a --volumes --force
                    '
                    """
                }
            }
        }



    }

    post {
        success {
            echo "✅ Git pull 기반 배포 완료"
        }
        failure {
            echo "❌ 배포 실패. 로그를 확인하세요."
        }
    }
}