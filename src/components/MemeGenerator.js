import React from "react"

class MemeGenerator extends React.Component {

    state = {
        randomImg: "http://i.imgflip.com/1bij.jpg",
        topText: "",
        bottomText: "",
        allMemeImgs: []
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then( response => response.json())
        .then( response => {
            const { memes } = response.data;
            console.log(memes);
            this.setState({ allMemeImgs: memes})
        })
    }

    handleChange = (e) => {
        const {name, value } = e.target;
        this.setState({ [name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState( state => {
            const randomNumber = Math.floor(Math.random() * state.allMemeImgs.length);
            return {
                randomImg: state.allMemeImgs[randomNumber].url 
            }

        })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        onChange={this.handleChange}
                        placeholder=" Top Text"
                    />
                    <input 
                        type="text"
                        name="bottomText"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                        placeholder=" Bottom Text"
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }

}

export default MemeGenerator

