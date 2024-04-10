import { useEffect, useState } from "react";

export const ChatConainter = () => {
  const [message, setMessage] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // listen message from server for updating
  }, []);

  const sendMessage = () => {
    setMessage((prev) => {
      return [...prev, newMessage];
    });
  };

  return (
    <div>
      <div>
        {message?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

      <div>
        <input
          value={newMessage}
          onChange={({ target: { value } }) => setNewMessage(value)}
          type="text"
          name=""
          id=""
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
