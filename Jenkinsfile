pipeline {
    agent any

    environment {
        CONFIG_NAME = 'test'
        REMOTE_SERVER = ''
        REMOTE_PATH = ''
        REMOTE_USER = 'ec2-user'  // 실제 SSH 접속 계정명
        LAST_DEPLOY_FILE = 'last_deploy_commit'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Determine Changed Files Since Last Deploy') {
            steps {
                script {
                    def lastCommit = sh(
                        script: "ssh -i '/var/jenkins_home/workspace/key/kim.pem' -o StrictHostKeyChecking=no ${env.REMOTE_USER}@${env.REMOTE_SERVER} 'cat ${env.REMOTE_PATH}/${env.LAST_DEPLOY_FILE} || echo HEAD~1'",
                        returnStdout: true
                    ).trim()

                    echo "📌 기준 커밋 ID (실서버 기준): ${lastCommit}"

                    def currentCommit = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()

                    def changedFiles = sh(
                        script: "git diff --name-only ${lastCommit} ${currentCommit}",
                        returnStdout: true
                    ).trim()

                    if (!changedFiles) {
                        echo "⚠️ 변경된 파일이 없습니다. 배포 종료."
                        env.CHANGED_FILES = ''
                        currentBuild.result = 'SUCCESS'
                        return
                    }

                    env.CHANGED_FILES = changedFiles
                    env.CURRENT_COMMIT = currentCommit
                }
            }
        }

        stage('Deploy Changed Files') {
            when {
                expression { env.CHANGED_FILES?.trim() }
            }
            steps {
                script {
                    def files = env.CHANGED_FILES.split('\n')
                    for (file in files) {
                        def trimmedFile = file.trim()
                        if (!trimmedFile) continue

                        echo "📤 파일 배포 중: ${trimmedFile}"

                        // 문자열로 부모 디렉터리 추출 (File 클래스 사용 금지)
                        def parentDir = trimmedFile.contains('/') ? trimmedFile.substring(0, trimmedFile.lastIndexOf('/')) : ''

                        sshPublisher(publishers: [
                            sshPublisherDesc(
                                configName: env.CONFIG_NAME,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: trimmedFile,
                                        removePrefix: '',
                                        //remoteDirectory: "${env.REMOTE_PATH}/${parentDir}"
                                    )
                                ],
                                verbose: true
                            )
                        ])
                    }

                    writeFile file: env.LAST_DEPLOY_FILE, text: env.CURRENT_COMMIT
                    sshPublisher(publishers: [
                        sshPublisherDesc(
                            configName: env.CONFIG_NAME,
                            transfers: [
                                sshTransfer(
                                    sourceFiles: env.LAST_DEPLOY_FILE,
                                    removePrefix: '',
                                    //remoteDirectory: env.REMOTE_PATH
                                )
                            ],
                            verbose: true
                        )
                    ])
                }
            }
        }


        stage('Start Service on Remote Server') {
            when {
                expression { env.CHANGED_FILES?.trim() }
            }
            steps {
                script {
                    echo "🚀 원격 서버에서 서비스 재시작 중..."

                    sh """
                    ssh -i '/var/jenkins_home/workspace/key/kim.pem' -o StrictHostKeyChecking=no ${env.REMOTE_USER}@${env.REMOTE_SERVER} '
                        cd ${env.REMOTE_PATH} && \
                        sudo ./gradlew build && \
                        sudo pkill -f "java.*kim-0.0.1-SNAPSHOT.jar" || true && \
                        sudo systemctl restart portfolio && \
                        echo "✅ portfolio 서비스 재시작 완료" && \
                        exit 0
                    '
                    """
                }
            }
        }



    }

    post {
        success {
            echo "✅ 변경된 파일만 성공적으로 배포 완료!"
        }
        failure {
            echo "❌ 파이프라인 실패. 로그를 확인하세요."
        }
    }
}