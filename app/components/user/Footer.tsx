export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-neutral-800 text-sm text-gray-600 dark:text-gray-300 py-10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">

                <div>

                </div>

                <div>

                </div>

                <div>

                </div>

                <div className="flex space-x-4 mt-3">

                </div>
            </div>

            <div className="text-center mt-10 text-xs text-gray-400 dark:text-gray-500">
                © {new Date().getFullYear()} All rights reserved.
            </div>
        </footer>
    );
}
