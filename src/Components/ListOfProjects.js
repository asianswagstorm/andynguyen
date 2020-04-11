import React from 'react';
import {tiles} from "./constants/Tiles";
import Card from "./Card";

const ListOfProjects = (props) => (
    <div className="content">
      {tiles.map((value, index) => 
        (
          value.type.includes(props.filterOption) ||
          props.filterOption === ""
        ) ?(
            <Card
              key={index}
              href={value.href}
              imgSrc={value.src}
              linkType = {value.linkType}
              alt=""
              title={value.title}
            />) : false 
      )}
      
      </div>
);

export default ListOfProjects;