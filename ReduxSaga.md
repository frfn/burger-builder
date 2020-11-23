# Will comeback if I have to learn Redux Saga

# Redux Saga - Alternative to Handling Async Code

-   Practice will be on copy of `/burgerbuilder` to practice React Redux Saga

## What is it used for?

-   `redux-saga` is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

# Hands On

## Creating Sagas - functions that run up actions and handle all side effect logic (accessing local storage, accessing a server, changing routes)

### /Store/sagas

-   created the `/sagas` folder
-   modifying `logout()` to become a saga, no async code, but access local storage which are side effects

### function\*

-   turns the function into a generator by adding
-   next gen JS
-   can be executed incrementally
    1. `yield`?
        - this step executed and will wait for this process to finish and won't continue until the step is done
        - by 'yeild'ing all steps, it will wait for each process to finish
        - looks like you need to yield for every saga function
    2. `index.js`
        - creating the middleware for redux saga
        1. `createSagaMiddleware()` & the saga function is imported
        2. `applyMiddleware()` takes in the constant that was created for saga middleware
        3. `.run(logoutSaga)` later replaced with `watchAuth`
        4. in Redux DevTool you can see that logout is executed twice, bc of `authCheckState()`
            - the saga function also ran! bc of the run()
        5. run the saga in the action creator
            - heavily modifying `logout()` in `auth.js` in `/action`
            1. comment out stuff inside logout()]
            2. create new action type, AUTH_INITIATE_LOGOUT
            3. create new index.js file with watchAuth()
            4. so `watchAuth()` is a listener,`takeEvery()` will listen for an action passed in that relates to a Saga and run it!
