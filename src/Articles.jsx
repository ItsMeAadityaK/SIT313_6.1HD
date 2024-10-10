import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import './Articles.css';

const Articles = () => {
    const articles = [
        { id: 1, title: 'React Overview', description: 'An introduction to React and its core principles.', author: 'Jane Doe', stars: 5 },
        { id: 2, title: 'NodeJS Tips', description: 'Best practices for backend development with NodeJS.', author: 'John Smith', stars: 4.5 },
        { id: 3, title: 'Advanced Hooks', description: 'Exploring React Hooks in-depth with use cases.', author: 'Alice Johnson', stars: 4.8 }
    ];

    return (
        <div className="article-container">
            <h2 className="articles-heading">Featured Articles</h2> 
            <Card.Group>
                {articles.map(article => (
                    <Card key={article.id}>
                        <Image src={`https://picsum.photos/200/120?random=${article.id}`} />
                        <Card.Content>
                            <Card.Header>{article.title}</Card.Header>
                            <Card.Meta>{article.description}</Card.Meta>
                            <Card.Description>
                                <div className="rating-author">
                                    <span>⭐ {article.stars}</span>
                                    <span className="author-name">{article.author}</span>
                                </div>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    );
};

export default Articles;
