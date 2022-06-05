import React from "react";
import { Component } from "react";
import './Sudoku.css'
import Landing from './Landing/landing'
import GameSection from './GameSection/gamesection'
import Information from './Information/information'

class Sudoku extends Component {
    render()
    {
        return (
            <div className="sudoku">
                <Landing />
                <GameSection />
                <Information />
            </div>
        )
    }
}

export default Sudoku;