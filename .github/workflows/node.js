# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
       node-version: 18
      
    - name: Install dependencies
      run: npm install
      
    - name: Build the Docker image
      run: docker build . --file Dockerfile --tag sdthiruma/nodejs-sample:v1
    
    - name: docker login
      env:
        DOCKER_USER:  ${{ secrets.DOCKER_USERNAME }}
        DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
      run: |
        docker login -u $DOCKER_USER -p $DOCKER_PASSWORD 
 
    - name: push the docker image
      run: docker push sdthiruma/nodejs-sample:v1
