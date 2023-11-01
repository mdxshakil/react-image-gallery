const MessageElement = ({ message }: { message: string }) => {
  return <p className="text-red-500 text-center my-2 text-sm">{message}</p>;
};

export default MessageElement;
