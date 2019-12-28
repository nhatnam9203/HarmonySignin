import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
// import codePush from 'react-native-code-push'
const store = createStore()

class App extends Component {

  // componentWillMount() {
  //   codePush.sync({
  //     installMode: codePush.InstallMode.ON_NEXT_RESTART,
  //     checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
  //   })
  // }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

const HPSignIn = DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
export default HPSignIn
// export default codePush(HPSignIn)