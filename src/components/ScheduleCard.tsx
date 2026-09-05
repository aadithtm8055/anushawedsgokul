import ImportedSchedule from "@/imports/App/index";

export default function ScheduleCard() {
  return (
    <div
      className="w-full mx-auto"
      style={{
        maxWidth: 460,
        minHeight: 316,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0px 20px 64px 0px rgba(90,24,40,0.35), 0px 4px 16px 0px rgba(0,0,0,0.18)",
        position: "relative",
      }}
    >
      <ImportedSchedule />
    </div>
  );
}
