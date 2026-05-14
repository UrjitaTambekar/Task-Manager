import jsPDF from "jspdf";

export default function ExportReport({
  tasks,
}) {

  const exportPDF = () => {

    const doc =
      new jsPDF();

    doc.text(
      "Task Report",
      20,
      20
    );

    tasks.forEach(
      (task, index) => {

        doc.text(
          `${index + 1}. ${task.title}`,

          20,

          40 + index * 10
        );
      }
    );

    doc.save(
      "task-report.pdf"
    );
  };

  return (
    <button
      onClick={exportPDF}
    >
      Export PDF
    </button>
  );
}