import Message from 'db/models/Message';


export const getRecentMsg = async (ctx) => {
  try {
    const messages = await Message.getRecent();

    ctx.body = {
      messages: messages.reverse()
    }
  } catch (e) {
    ctx.throw(e, 500);
  }
}
