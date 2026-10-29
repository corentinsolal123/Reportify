import {
  DailyRowData,
  GeneratedReport,
  HTML_COLOR_MAP,
  OPINION_COLOR_MAP,
  OPINION_LABELS,
  Opinion,
  WeeklyReportData,
} from "@/types";

// Inline styles only: email clients (Outlook in particular) ignore CSS classes.
const STYLES = {
  wrapper: "font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1f2937;",
  table:
    "width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-family: Arial, Helvetica, sans-serif; font-size: 14px;",
  headerCell:
    "background-color: #4c1d95; color: #ffffff; border: 1px solid #4c1d95; padding: 8px 12px; text-align: left; font-weight: bold;",
  cell: "border: 1px solid #d1d5db; padding: 8px 12px; vertical-align: top; color: #1f2937;",
  heading: "font-size: 16px; color: #4c1d95; margin: 20px 0 4px;",
};

// Pure string escaping so the generator also runs during SSR.
export const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Escapes the text and keeps the line breaks typed in textareas.
const toHtml = (text: string, fallback = ""): string => {
  const value = text.trim();

  if (!value) return fallback ? `<em style="color: #6b7280;">${fallback}</em>` : "";

  return escapeHtml(value).replace(/\r?\n/g, "<br>");
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Plain-text value, with continuation lines aligned under the bullet content.
const toText = (text: string, indent: string, fallback = "—"): string =>
  text.trim().replace(/\r?\n/g, `\n${indent}`) || fallback;

const opinionLabel = (opinion: Opinion): string =>
  opinion.opinionResult ? OPINION_LABELS[opinion.opinionResult] : "Non renseigné";

export const isDailyRowFilled = (row: DailyRowData): boolean =>
  Boolean(row.name.trim() || row.yesterday.trim() || row.today.trim());

export const generateDailyReport = (
  rows: DailyRowData[],
  date: Date = new Date(),
): GeneratedReport => {
  const filledRows = rows.filter(isDailyRowFilled);
  const title = `Daily du ${formatDate(date)}`;

  const htmlRows = filledRows
    .map(
      (row) => `
      <tr>
        <td style="${STYLES.cell} font-weight: bold; width: 20%;">${toHtml(row.name, "—")}</td>
        <td style="${STYLES.cell} width: 40%;">${toHtml(row.yesterday, "—")}</td>
        <td style="${STYLES.cell} width: 40%;">${toHtml(row.today, "—")}</td>
      </tr>`,
    )
    .join("");

  const html = `<div style="${STYLES.wrapper}">
  <p style="${STYLES.heading} margin-top: 0;"><strong>${escapeHtml(title)}</strong></p>
  <table style="${STYLES.table}">
    <thead>
      <tr>
        <th style="${STYLES.headerCell}">Nom</th>
        <th style="${STYLES.headerCell}">Hier</th>
        <th style="${STYLES.headerCell}">Aujourd'hui</th>
      </tr>
    </thead>
    <tbody>${htmlRows}
    </tbody>
  </table>
</div>`;

  const text = [
    title,
    "",
    ...filledRows.map((row) =>
      [
        `• ${toText(row.name, "  ")}`,
        `  Hier : ${toText(row.yesterday, "    ")}`,
        `  Aujourd'hui : ${toText(row.today, "    ")}`,
      ].join("\n"),
    ),
  ].join("\n");

  return { html, text };
};

export const generateWeeklyReport = (report: WeeklyReportData): GeneratedReport => {
  const name = report.name.trim() || "Nom non renseigné";
  const signature = report.signature.trim();
  const tasks = report.tasks.filter((task) => task.taskName.trim() || task.taskObservation.trim());

  const taskRows = tasks.length
    ? tasks
        .map(
          (task) => `
      <tr>
        <td style="${STYLES.cell} font-weight: bold; width: 40%;">${toHtml(task.taskName, "Tâche sans titre")}</td>
        <td style="${STYLES.cell} width: 60%;">${toHtml(task.taskObservation, "Pas d'observation")}</td>
      </tr>`,
        )
        .join("")
    : `
      <tr><td colspan="2" style="${STYLES.cell}"><em style="color: #6b7280;">Aucune tâche renseignée</em></td></tr>`;

  const opinionRows = report.opinions
    .map((opinion) => {
      const color = HTML_COLOR_MAP[OPINION_COLOR_MAP[opinion.opinionResult]];

      return `
      <tr>
        <td style="${STYLES.cell} width: 40%;">
          ${escapeHtml(opinion.opinionContext)} : <span style="color: ${color}; font-weight: bold;">${escapeHtml(opinionLabel(opinion))}</span>
        </td>
        <td style="${STYLES.cell} width: 60%;">${toHtml(opinion.opinionComment, "Pas de commentaire")}</td>
      </tr>`;
    })
    .join("");

  const html = `<div style="${STYLES.wrapper}">
  <p>Bonjour,</p>
  <p>Vous trouverez ci-dessous les observations de la semaine concernant le travail de <strong>${escapeHtml(name)}</strong> :</p>
  <table style="${STYLES.table}">
    <thead>
      <tr>
        <th style="${STYLES.headerCell}">Tâches à mener</th>
        <th style="${STYLES.headerCell}">Observations</th>
      </tr>
    </thead>
    <tbody>${taskRows}
    </tbody>
  </table>
  <p style="${STYLES.heading}"><strong>Mon avis</strong></p>
  <table style="${STYLES.table}">
    <thead>
      <tr>
        <th style="${STYLES.headerCell}">Objet</th>
        <th style="${STYLES.headerCell}">Commentaire</th>
      </tr>
    </thead>
    <tbody>${opinionRows}
    </tbody>
  </table>
  <p>Cordialement,</p>${signature ? `\n  <p><strong>${toHtml(signature)}</strong></p>` : ""}
</div>`;

  const text = [
    "Bonjour,",
    "",
    `Vous trouverez ci-dessous les observations de la semaine concernant le travail de ${name} :`,
    "",
    "TÂCHES",
    ...(tasks.length
      ? tasks.map(
          (task) =>
            `• ${task.taskName.trim() || "Tâche sans titre"} : ${toText(task.taskObservation, "  ", "Pas d'observation")}`,
        )
      : ["Aucune tâche renseignée"]),
    "",
    "MON AVIS",
    ...report.opinions.map(
      (opinion) =>
        `• ${opinion.opinionContext} : ${opinionLabel(opinion)} — ${toText(opinion.opinionComment, "  ", "Pas de commentaire")}`,
    ),
    "",
    "Cordialement,",
    ...(signature ? [signature] : []),
  ].join("\n");

  return { html, text };
};
