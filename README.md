# wristband-file-server

## Application Summary

The Wristband Radio app is a streaming music player that showcases music from local artists. The app has streaming-radio, on-demand streaming, a music submission form, contact form, and an about page. Please check out the live application at [wristbandradio.com](https://wristbandradio.com)

I'm creating this project for many reasons. First of all, it has been a lifelong dream of mine to create this kind of app for myself and my fellow local musicians, so it's definitely a passion project for me. Beyond that though, I want to have a public example of my full stack development skills to act as a portfolio while I search for a better developer job. Futhermore, I just like to code. I enjoy making projects in my spare time, and it helps me grow my programming skills.

## Project Summary

The wristband-file-server project is currently the sole api in the Wristband Radio app.

The primary purpose of the api is to serve audio files to the front-end in a reliable manner. The cloud storage we're using to store audio files will sometimes serve the files in chunks and other times serve them in their entirety. However, the audio library we're using in the front-end requires the files to be served in chunks every time, otherwise the pause and seek functionality doesn't work.

The secondary purpose of this api is to handle music submissions and contact form submissions. This isn't necessary for our current front-end project, found in the wristband-collection repo, because that's a NextJs project with its own backend component. Therefore, only the music streaming functionality is currently being consumed from this API in production. However, as we roll out the mobile native version of the application, we will need an api to handle those form submissions.

In the future, we may separate the form submission functionality into a separate api. For now though, we are using the most lean approach possible to save money in cloud hosting.

## Project Setup

There are multiple ways to setup the project, depending on your needs/goals. You can run this api alone and test it with postman or swagger. If you just want to take a look at the application and prove that this code works, then I reccommend spinning it up using docker alone. If you're interested in debugging or playing around with the api code, then I would recommend spinning up the frontend in docker and running this project from the console. You can also clone both project repos and run them both locally from the console if you're interested in debugging or playing around in the fronend code as well. Please don't hesitate to reach out to me through the [contact form](https://wristbandradio.com/contact) or at the email address listed on my resume.

**Prerequisites for project setup:** VsCode, Docker, Node 20.11.1, npm 10.2.4

I have made my current dev environment public to make it easier for potential employers to test my project. This does not expose any resources or secrets used in production. In fact, even this dev environment will be replaced by a completely separate/segregated dev environment in the future, and this environment will be reserved solely for public portfolio projects.

**Important note:** The missing value in the env file can be found by decoding this using a base64 decoder: TDZVOFF+cG9tMl8zLk5CUUZydDZMLWZ0M0RqT0tWcnFnTy5KRWFmNA==

### Run just this project locally

**clone the repo:** git clone https://github.com/Downeys/wristband-file-server.git
**install the packages:** npm ci
**setup environment variables:**

- locate the .env-example file at the root of the project and rename it to .env
- There is one variable in the .env file with a value of 'get-from-readme'. Take the encoded value above, decode it in a base64 decoder, and use the result in place of 'get-from-readme'.

**run the project:** npm start

### Run the full application in docker

**clone the repo:** git clone https://github.com/Downeys/wristband-file-server.git
**install the packages:** npm ci
**setup environment variables:**

- locate the .env-example file at the root of the project and rename it to .env
- There is one variable in the .env file with a value of 'get-from-readme'. Take the encoded value above, decode it in a base64 decoder, and use the result in place of 'get-from-readme'.

**run the docker compose:** docker compose up -d

### Run local backend with docker frontend

**clone the backend repo:** git clone https://github.com/Downeys/wristband-file-server.git
**install the packages:** npm ci
**setup environment variables:**

- locate the .env-example file at the root of the project and rename it to .env
- There is one variable in the .env file with a value of 'get-from-readme'. Take the encoded value above, decode it in a base64 decoder, and use the result in place of 'get-from-readme'.

**run the frontend** docker compose -f docker-compose.frontend.yml up -d
**run the file servers:** npm start

### Run backend and frontend from local console

**clone the backend repo:** git clone https://github.com/Downeys/wristband-file-server.git
**install the packages:** npm ci
**setup environment variables:**

- locate the .env-example file at the root of the project and rename it to .env
- There is one variable in the .env file with a value of 'get-from-readme'. Take the encoded value above, decode it in a base64 decoder, and use the result in place of 'get-from-readme'.

**run the backend:** npm start

**clone the frontend repo:** git clone https://github.com/Downeys/wristband-collection.git
**install the packages:** npm ci
**setup environment variables:**

- locate the .env-example file at the root of the project and rename it to .env
- There is one variable in the .env file with a value of 'get-from-readme'. Take the encoded value above, decode it in a base64 decoder, and use the result in place of 'get-from-readme'. It's the same value for both projects.

**run the frontend:** npm run dev

## Usage

Please refer to the openApi documentation for usage details. You can find this by running the backend application using the instructions described above, and then navigating to [http://localhost:8080/docs](http://localhost:8080/docs).

## Unit tests

All major functionality in this project is unit tested. Integration tests haven't been added yet. Currently the project boasts over 100 unit tests and over 95% unit test code coverage - details below.

**Two ways to run the unit tests:**
npm run test
npx jest

**Results:**
-----------------------------------------|---------|----------|---------|---------|-------------------  
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
-----------------------------------------|---------|----------|---------|---------|-------------------  
All files | 96.34 | 94.49 | 92.98 | 96.34 |  
 common/application/errors | 83.33 | 100 | 50 | 83.33 |  
 NotFoundError.ts | 66.66 | 100 | 0 | 66.66 | 5-7  
 ValidationError.ts | 100 | 100 | 100 | 100 |  
 common/domain/errors | 100 | 100 | 100 | 100 |  
 ArgumentError.ts | 100 | 100 | 100 | 100 |  
 BaseError.ts | 100 | 100 | 100 | 100 |  
 common/domain/utils | 100 | 100 | 100 | 100 |  
 argumentHelpers.ts | 100 | 100 | 100 | 100 |  
 common/infrastructure/config | 97.61 | 75 | 100 | 97.61 |  
 config.ts | 97.61 | 75 | 100 | 97.61 | 60-61  
 common/infrastructure/constants | 100 | 100 | 100 | 100 |  
 blobConstants.ts | 100 | 100 | 100 | 100 |  
 exceptionMessages.ts | 100 | 100 | 100 | 100 |  
 common/infrastructure/errors | 100 | 100 | 100 | 100 |  
 BlobStorageError.ts | 100 | 100 | 100 | 100 |  
 DataAccessError.ts | 100 | 100 | 100 | 100 |  
 common/infrastructure/logging | 65.85 | 60 | 60 | 65.85 |  
 logging.ts | 65.85 | 60 | 60 | 65.85 | 11,18-23,27,34-39
common/infrastructure/repo | 44 | 100 | 0 | 44 |  
 mongoRepo.ts | 44 | 100 | 0 | 44 | 11-24  
 common/infrastructure/services | 100 | 93.75 | 100 | 100 |  
 blobService.ts | 100 | 93.75 | 100 | 100 | 60  
 common/infrastructure/utils/helpers | 100 | 100 | 100 | 100 |  
 fileHelpers.ts | 100 | 100 | 100 | 100 |  
 testHelpers.ts | 100 | 100 | 100 | 100 |  
 common/presentation/config | 100 | 75 | 100 | 100 |  
 config.ts | 100 | 75 | 100 | 100 | 30  
 common/presentation/constants | 100 | 100 | 100 | 100 |  
 serverConstants.ts | 100 | 100 | 100 | 100 |  
 common/presentation/controllers | 100 | 100 | 100 | 100 |  
 errorController.ts | 100 | 100 | 100 | 100 |  
 common/presentation/errors | 100 | 100 | 100 | 100 |  
 asyncErrorHandler.ts | 100 | 100 | 100 | 100 |  
 healthCheck/presentation/controllers | 100 | 100 | 100 | 100 |  
 healthCheckController.ts | 100 | 100 | 100 | 100 |  
 streaming/application/constants | 100 | 100 | 100 | 100 |  
 fileConstants.ts | 100 | 100 | 100 | 100 |  
 headerConstants.ts | 100 | 100 | 100 | 100 |  
 streaming/application/services | 100 | 100 | 100 | 100 |  
 audioStreamingService.ts | 100 | 100 | 100 | 100 |  
 streaming/presentation/controllers | 100 | 100 | 100 | 100 |  
 audioStreamingController.ts | 100 | 100 | 100 | 100 |  
 submissions/application/services | 100 | 100 | 100 | 100 |  
 musicSubmissionService.ts | 100 | 100 | 100 | 100 |  
 submissions/domain/constants | 100 | 100 | 100 | 100 |  
 musicSubmissionValidationMessages.ts | 100 | 100 | 100 | 100 |  
 submissions/domain/entities | 100 | 100 | 100 | 100 |  
 MusicSubmissionEntity.ts | 100 | 100 | 100 | 100 |  
 MusicSubmissionForm.ts | 100 | 100 | 100 | 100 |  
 submissions/domain/specifications | 100 | 100 | 100 | 100 |  
 musicSubmissionEntitySpecifications.ts | 100 | 100 | 100 | 100 |  
 musicSubmissionFormSpecifications.ts | 100 | 100 | 100 | 100 |  
 submissions/domain/validators | 100 | 100 | 100 | 100 |  
 musicSubmissionEntityValidator.ts | 100 | 100 | 100 | 100 |  
 musicSubmissionFormValidator.ts | 100 | 100 | 100 | 100 |  
 submissions/infrastructure/models | 100 | 100 | 100 | 100 |  
 musicSubmission.ts | 100 | 100 | 100 | 100 |  
 submissions/infrastructure/repositories | 100 | 100 | 100 | 100 |  
 musicSubmissionRepo.ts | 100 | 100 | 100 | 100 |  
 submissions/presentation/controllers | 100 | 100 | 100 | 100 |  
 musicSubmissionController.ts | 100 | 100 | 100 | 100 |  
-----------------------------------------|---------|----------|---------|---------|-------------------
