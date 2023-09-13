export const composeMessage = (content: string) => {
  return {
    content,
    time: new Date().toLocaleTimeString(),
  };
};

//TODO centralize the creation of messages, maybe randomly choosing a message based on the action
