try {
	node ('Slave-simone') {
        deleteDir()
        dir('project'){
            git credentialsId: '56e6dec6-558f-40a8-8d81-23bff8ebb509', url: 'git@el2604.bc:DOF-Official/user-search.git'
            withEnv(["PATH+NODE=/msservice/app/node/bin"]) {

            stage 'install'
                echo "TARGET_ENV=${TARGET_ENV}"
                sh 'npm install'


            stage 'dist'
                sh 'npm run tarball'

            stage 'deploy'

                ansiblePlaybook(
                        playbook: '/home/msservice/ansible/copy.yml',
                        inventory: '/home/msservice/ansible/hosts/hosts.ini',
                        extras: '--extra-vars "app=\'customer-search\' env=\'' +
                                "${TARGET_ENV}"
                                + '\' ver=\'1.3.0\' bucket=\'config\'"'
                )
            currentBuild.result = "SUCCESS"
            mail body: "Build was a success! Check details at ${env.BUILD_URL}console.", from: "architecture.jenkins@belgacom.be", subject: "Build SUCCESS in Jenkins: ${env.JOB_NAME} # ${env.BUILD_NUMBER}", to: "pxs.dof.dev.team@proximus.com"
        }
       }
    }
} catch (e){
	currentBuild.result = "FAILED"
    mail body: "Please go to ${env.BUILD_URL}console.", from: "architecture.jenkins@belgacom.be", subject: "Build failed in Jenkins: ${env.JOB_NAME} # ${env.BUILD_NUMBER}", to: "pxs.dof.dev.team@proximus.com"
    throw e
}

