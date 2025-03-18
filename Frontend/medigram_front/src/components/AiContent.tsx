import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface AIContentData {
  text?: string;
  [key: string]: any;
}

const AIContent: React.FC = () => {
  const [content, setContent] = useState<AIContentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<AIContentData>('/api/ai-content')
      .then((response) => {
        setContent(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching AI content:', err);
        setError('שגיאה בטעינת המידע');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>טוען...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>תוכן מעובד על ידי AI</h1>
      {content && content.text ? (
        <p>{content.text}</p>
      ) : (
        <pre>{JSON.stringify(content, null, 2)}</pre>
      )}
    </div>
  );
};

export default AIContent;
