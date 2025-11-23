import DOMPurify from "isomorphic-dompurify";
import { WeeklyRowData, OPINION_COLOR_MAP, HTML_COLOR_MAP } from "@/types";

const TABLE_STYLES = {
  table: `
    width: 100%;
    border-collapse: collapse;
    background-color: #2e2e2e;
    color: white;
    font-family: Arial, sans-serif;
  `,
  headerRow: "background-color: #1e1e1e;",
  cell: "border: 1px solid #444; padding: 10px;",
  headerCell: "border: 1px solid #444; padding: 10px; text-align: left;",
};

const escapeHtml = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

export const generateWeeklyReportHtml = (rows: WeeklyRowData[]): string => {
  if (rows.length === 0) return "<p>Aucune donnée disponible.</p>";

  const name = rows[0]?.name.trim() || "Nom non renseigné";

  // Introduction
  let html = `
    <p>Bonjour,</p>
    <p>
      Vous trouverez ci-dessous les observations de la semaine concernant le travail de <strong>${escapeHtml(name)}</strong> :
    </p>
  `;

  // Tableau des tâches
  html += `
    <table style="${TABLE_STYLES.table} margin-bottom: 20px;">
      <thead>
        <tr style="${TABLE_STYLES.headerRow}">
          <th style="${TABLE_STYLES.headerCell} width: 40%;">Tâches à mener</th>
          <th style="${TABLE_STYLES.headerCell} width: 60%;">Observations</th>
        </tr>
      </thead>
      <tbody>
  `;

  rows.forEach((row) => {
    row.tasks.forEach((task) => {
      html += `
        <tr>
          <td style="${TABLE_STYLES.cell} font-weight: bold;">${escapeHtml(task.taskName)}</td>
          <td style="${TABLE_STYLES.cell}">${escapeHtml(task.taskObservation) || "Pas d'observation"}</td>
        </tr>
      `;
    });
  });

  html += "</tbody></table>";

  // Tableau des opinions
  html += `
    <h3 style="color: white; margin-top: 20px;">Mon avis :</h3>
    <table style="${TABLE_STYLES.table}">
      <thead>
        <tr style="${TABLE_STYLES.headerRow}">
          <th style="${TABLE_STYLES.headerCell} width: 40%;">Objet</th>
          <th style="${TABLE_STYLES.headerCell} width: 60%;">Commentaire</th>
        </tr>
      </thead>
      <tbody>
  `;

  rows.forEach((row) => {
    row.opinions.forEach((opinion) => {
      const colorKey = OPINION_COLOR_MAP[opinion.opinionResult];
      const color = HTML_COLOR_MAP[colorKey];

      html += `
        <tr>
          <td style="${TABLE_STYLES.cell}">
            ${escapeHtml(opinion.opinionContext)}: <span style="color: ${color}; font-weight: bold;">${escapeHtml(opinion.opinionResult) || "Non renseigné"}</span>
          </td>
          <td style="${TABLE_STYLES.cell}">${escapeHtml(opinion.opinionComment) || "Pas de commentaire"}</td>
        </tr>
      `;
    });
  });

  html += "</tbody></table>";

  // Conclusion
  html += `
    <p style="margin-top: 20px; color: white; font-size: 1.1rem;">Cordialement,</p>
    <p style="color: white; font-weight: bold;">L'équipe de gestion</p>
  `;

  // Sanitize the HTML before returning
  return DOMPurify.sanitize(html);
};
