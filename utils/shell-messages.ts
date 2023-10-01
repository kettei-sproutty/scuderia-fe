import { getRandomInt, getRandomPeriod } from "@utils/utils";

import { ActionType } from "../typings/fake-shell";

export const composeMessage = (action: ActionType) => {
  return {
    content: createMessage(action),
    time: new Date().toLocaleTimeString(),
  };
};

const createMessage = (action: ActionType) => {
  const messages: Record<ActionType, string[]> = {
    welcome: ["Welcome to Scuderia-FE"],
    wrongCode: [
      "Wrong Code, It's so secret that you forgot it already?",
      `After ${getRandomInt(
        1,
        50,
      )} tries you might win something (the value is random, we don't take any responsibility if it raises the next time you try)`,
      `The code is wrong, try again in ${getRandomInt(
        1,
        1500,
      )} ${getRandomPeriod()}, just kidding you can do it now`,
      "That's not the code, but you can try again, we are not going anywhere",
    ],

    codeSent: [
      "We sent you a code. Even if it's ULTRA MEGA SECRET you still have to provide it",
      "Between all your unread emails, you should find one with a code, please insert it here",
      `Haven't you received the code yet? Maybe you should check again, we are ${getRandomInt(
        0,
        100,
      )}% sure we sent it`,
    ],
    firstFocusLogin: [
      "Insert YOUR Enterprise ID to log in. Or someone else's if you wanna clog up their mailbox",
      "We already know who you are, but we need to check if you do. Can you please insert your Enterprise ID?",
      "Write carefully your Enterprise ID, we don't want to send the code to someone else, do you?",
      "Type your enterprise ID, so our umpa lumpas can process it",
    ],
  };

  return messages[action][getRandomInt(0, messages[action].length - 1)];
};
