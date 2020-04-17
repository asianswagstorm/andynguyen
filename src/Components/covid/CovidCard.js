import React from "react";
import {Card ,CardDeck} from "react-bootstrap";
import {addComma} from "./covidFunction";
const CovidCard = (props) => {
    return(
        <CardDeck>
             {props.listItems.map((item,key) => 
                <Card
                    bg={item.background}
                    text="white"
                    className="text-center"
                    style={{ margin: "10px" }}
                    key={key}
                >
                    <Card.Body>
                        <Card.Title> {item.itemLabel} </Card.Title>
                        <Card.Text> {addComma(item.itemValue)} </Card.Text>
                    </Card.Body>
                </Card>
                    
                )}
        </CardDeck>
    )
}
export default CovidCard;
