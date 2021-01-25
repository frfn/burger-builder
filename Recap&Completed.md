# Burger Builder-

Takeaways:

-   Redux Dev Tool can be set only for development:

    Module 347 -
    Environment Variables —> /config/env.js - env variables are project specific so you must implement this or know the project has this

    `const composeEnhancer = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;`

-   lazy() + Suspense

    -   implementation:

        ```
        const Auth = lazy( () => import(“../../Containers/Auth/Auth” )
        ```

    -   using: note, (props) must be passed or Auth will have no props

        ```
        let routes = (
            <Switch>
                <Route path=“/auth” render={ (props) => <Auth {…props} /> } />
            </Switch>
        )
        ```

    -   finishing: note, ‘fallback’ must be used
        ```
        <Suspense fallback={AnyComponent}>
            {routes}
        </Suspense>
        ```

-   the logic for `build controls` is cool, adds ingredients and stuff plus creates the burger!

    -   add, remove,

-   Code logic excels in Car Services, take a look at that!

<br>

# Testing

because even the _simplest_ thing can go wrong. So test.

<br>

-   Going to the the documentation of Jest + Enzyme can give you all the functions, utility methods and see what's available

-   Took notes on Tests

    -   Test Runner: executes test code + provide validation library, does not run in browser but emulated in one
        -   create-react-app already installed and configured the test runner
        -   Jest is a test runner
        -   don’t manually install Jest, compatibility issues
    -   Testing utilities: helps with testing ( we need an emulator to test our components )

        -   Enzyme is a testing utility ( as well as React Test Utils, Enzyme is more preferred )

    -   what not to and what to test
        -   DON’T TEST: libraries, complex connections
        -   DO: just see if the component renders correctly

-   Steps to test

    1.  `npm -i --save enzyme react-test-renderer enzyme-adapter-react-16`
    2.  Write tests

        -   Files must have `.test.js` extensions to become test specific

        -   Enzyme makes it possible to render components stand alone, no need to render ALL the other components just for this component to run! Unit tests, standalone tests!

        <br>

        ## See how these are written in the `.test.js` files!

        | Key Word                 | Description                                                                                                            | Example                                          |
        | :----------------------- | :--------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
        | `describe('Nav items!')` | console logs what's inside                                                                                             | will output Nav items!                           |
        | `it()`                   | how tests are written, describes a test, takes two arguments, a string that says what it should do and the actual test | it("should render two nav items if now auth!", ) |
        | `expect()`               | we define what we want to check!                                                                                       | wrapper.find(), find the nav items!              |

    <br>

    ## Good to know before writing tests:

    ## Jest

    -   has `expect()` utilites for testing

    -   `Mocking` ( from Jest )

        -   Mock means replace
        -   It handles async code
        -   Let's say we don't want to reach out to the web and grab data
        -   Mocking is the user created, async response that we will test
        -   We're mocking the **_return data_**!

    ## Enzyme

    each of the three will have it's own helper methods, utility functions!

    -   `Shallow`: renders only the component | `unit testing` is preferred
    -   `Full`: renders the whole tree
    -   `Static`:

    if `wrapper` is set to:

        wrapper = shallow(<NavItems />)

    `wrapper` is an Enzyme object that will receive all the helper methods

    <br>

    ## Prereq:

    -   if you get a blocking error -- delete `App.test.js`
    -   `import { configure, shallow } from enzyme`
    -   `import Adapter from 'enzyme-adapter-react-16'`
    -   `configure({adapter: new Adapter()})`
    -   `import React from 'react'`
    -   `shallow()` is the fastest test, this is what renders only ONE component without having to render all other components

    Function component:

    1. `Navigation.test.js`

    2. **`shallow()`** takes in the component, shallowly renders the component, from **Enzyme**

    3. utility function from **Enzyme**, **`.find()`**, sees if this will contain a certain content (NavigationItem)

    4. utility methods from **Jest**, **`.toHaveLength(2)`**

    5. `npm test`

    6. Adding and setting props? From **Enzyme**! `shallow(<NavigationItems isAuthenticated />)`

    7. beforeEach(), afterEach()

    8. **Enzyme** package has `.setProps()` to easily pass in props to the component!
        - `wrapper.setProps({isAuthenticated: true})`

    <br>

    container component:

    -   if the class does **NOT** have `export` in front of it, make it so, so you can export the class and test

    `export class BurgerBuilder extends Component { ... `

    -   still have the `default export BurgerBuilder` at the end, this just sets it to render the Burger Builder component by default

    -   while the first `export` makes it **_POSSIBLE_** to export the Burger Builder component, for testing, etc.

    redux component:

    -   you're just testing to see if the reducer function works

    -   no component render, just a JS function

    -   easiest to test out of the three that is mentioned here

<br>
<br>

# Conclusion.

testing should be easy, do not make it hard.
