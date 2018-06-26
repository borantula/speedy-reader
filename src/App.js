import React, {Component} from 'react';
import './App.css';
import sampleTxt from './files/text';
import wpmIntervalCalculator from './actions/wpm-interval-calculator';
import DisplayScreen from "./components/DisplayScreen";
import PageNumberAndWpmCounter from "./components/PageNumberAndWpmCounter";
import ControlButtons from "./components/ControlButtons";
import AppInputs from "./components/AppInputs";
import separateWords from "./actions/separate-words";

class App extends Component {

    constructor(props) {
        super(props);

        this.readingMaterial = sampleTxt;

        this.timer = false;

        // Default values
        this.state = {
            readingMaterial: this.readingMaterial,
            currentDisplayedText: "",
            currentDisplayedIndex: 0,
            wordsPerDisplay: 2,
            separatedWords: [],
            playing: false,
            wpm: 240
        };
    }

    componentDidMount() {
        this.updateWordSettings();

    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.playing === false && this.state.playing === true) {

            const intervalTiming = wpmIntervalCalculator(this.state.wpm, this.state.wordsPerDisplay);

            // start interval to play
            this.timer = setInterval(() => {

                const currentText = this.state.separatedWords[this.state.currentDisplayedIndex];

                if (undefined === currentText) {
                    clearInterval(this.timer);
                    this.setState({
                        currentDisplayedIndex: 0,
                        currentDisplayedText: ""
                    })
                    return;
                }

                this.setState({
                    currentDisplayedIndex: this.state.currentDisplayedIndex + 1,
                    currentDisplayedText: currentText
                })
            }, intervalTiming)
        }


        if (prevState.playing === true && this.state.playing === false) {
            // start interval to play
            clearInterval(this.timer);
            this.timer = false;
        }
    }


    updateWordSettings() {
        this.setState({
            separatedWords: separateWords(this.readingMaterial, this.state.wordsPerDisplay)
        })
    }

    stopReading = () => this.setState({playing: false})

    startReading = () => this.setState({playing: true})

    resetReading = () => {
        this.setState({
            playing: false,
            currentDisplayedIndex: 0,
            currentDisplayedText: ""
        })
    }

    handleChangeWPM = (event) => {
        this.setState({
            wpm: Number(event.target.value),
        })

        this.resetReading();
    }

    handleChangeWordsPerDisplay = (event) => {
        const count = Number(event.target.value);
        this.setState({
            wordsPerDisplay: count,
            separatedWords: separateWords(this.readingMaterial, count)
        })

        this.resetReading();
    }


    render() {

        return (
            <div className="App">
                <DisplayScreen text={this.state.currentDisplayedText}/>
                <PageNumberAndWpmCounter
                    currentIndex={this.state.currentDisplayedIndex}
                    total={this.state.separatedWords.length}
                    wpm={this.state.wpm}
                />

                <AppInputs playing={this.state.playing}
                           wpm={this.state.wpm}
                           wordsPerDisplay={this.state.wordsPerDisplay}
                           handleChangeWPM={this.handleChangeWPM}
                           handleChangeWordsPerDisplay={this.handleChangeWordsPerDisplay}
                />
                <ControlButtons
                    playing={this.state.playing}
                    stop={this.stopReading}
                    start={this.startReading}
                    reset={this.resetReading}
                />
            </div>
        );
    }
}

export default App;
