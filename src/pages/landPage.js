const LandPage = () => {
  return (
    <div>
      <iframe
        style={{
          background: "#F1F5F4",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
          width: "100vw",
          height: "100vh",
        }}
        title="Task Manager Dashboard"
        src="https://charts.mongodb.com/charts-task-manager-tkjls/embed/dashboards?id=0608d54e-2393-4cf6-a5d2-34b0d17174ed&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=true&scalingWidth=scale&scalingHeight=scale"
      ></iframe>
    </div>
  );
};

export default LandPage;
