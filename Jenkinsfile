pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  parameters {
    choice(name: 'TARGET_ENV', choices: ['crt', 'crt2', 'crt3'], description: 'Entorno a desplegar (local docker compose)')
  }

  environment {
    COMPOSE_FILE = "infra/compose/docker-compose.yml"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build images') {
      steps {
        sh '''
          set -eux
          docker compose -f ${COMPOSE_FILE} build --no-cache
        '''
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          set -eux
          ENV_FILE="infra/env/.env.${TARGET_ENV}"
          PROJECT="erpperu2-${TARGET_ENV}"

          docker compose --env-file "$ENV_FILE" -p "$PROJECT" -f ${COMPOSE_FILE} up -d --remove-orphans
          docker compose --env-file "$ENV_FILE" -p "$PROJECT" -f ${COMPOSE_FILE} ps
        '''
      }
    }
  }

  post {
    always {
      echo "Fin del pipeline."
    }
  }
}
