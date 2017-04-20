node {
    git url: GIT_URL

    stage "Pre-configure" // --------------------------------------

    preConfigure()
}

def preConfigure() {
    def command = 'cd pipeline/resources\n' +
        '/bin/bash ./pre-configure.sh '
    sh command
}