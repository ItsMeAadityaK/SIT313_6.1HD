import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import './Tutorials.css'; 

const Tutorials = () => {
    const tutorials = [
        { id: 1, title: 'JS6 Essentials', description: 'Understanding the fundamentals of JS6.', user: 'Aaditya', rating: 5 },
        { id: 2, title: 'React Router', description: 'Implementing navigation in your React app.', user: 'AK', rating: 5 },
        { id: 3, title: 'Express Basics', description: 'Building server-side applications with Express.', user: 'Aadi', rating: 4.9 }
    ];

    return (
        <div className="tutorial-container">
            <h2 className="tutorials-heading">Featured Tutorials</h2>
            <Card.Group>
                {tutorials.map(tutorial => (
                    <Card key={tutorial.id}>
                        <Image src={`https://picsum.photos/200/120?random=${tutorial.id + 1000}`} />
                        <Card.Content>
                            <Card.Header>{tutorial.title}</Card.Header>
                            <Card.Meta>{tutorial.description}</Card.Meta>
                            <Card.Description>
                                <div className="rating-user">
                                    <span>⭐ {tutorial.rating}</span>
                                    <span className="user-name">{tutorial.user}</span>
                                </div>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            
        </div>
    );
};

export default Tutorials;