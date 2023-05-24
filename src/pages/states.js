import StatesList from "../components/StatesList";

const States = ({ triggerAction, setTriggerAction, user }) => {
  return (
    <StatesList
      triggerAction={triggerAction}
      setTriggerAction={setTriggerAction}
      user={user}
    />
  );
};

export default States;
