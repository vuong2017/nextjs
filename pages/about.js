import React, { Component } from 'react'
class About extends Component {
  static async getInitialProps ({ store, query }) {
    return await new Promise((ketqua, loi) => {
        setTimeout(() => ketqua(({ a: 100})),1000)
    })
  }

  constructor(props) {
      super(props)
      this.cac = {a:1}
      console.log("vao constructor")
  }

  componentWillMount() {
      console.log("vao willmout")
  }

  componentDidMount() {
      const result = this.alertphatnao()
      console.log("vao didmount", result)
  }

  alertphatnao = () => ({...this.cac, a:2})

  render () {
    console.log(" chay sau ")
    const { a } = this.props
    return <h1 className="example1">about {a}</h1>
  }
}

export default About
