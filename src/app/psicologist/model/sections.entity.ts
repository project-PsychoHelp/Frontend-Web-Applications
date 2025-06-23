export class Sections {
  id: number;               // ID único de la sesión
  studentId: number;        // ID del estudiante asociado
  type: string;        // Tipo de sesión (ej: "Orientación Vocacional")
  date: string;             // Fecha de la sesión (formato "YYYY-MM-DD")
  time: string;             // Hora de inicio (formato "HH:mm")
  endTime: string;          // Hora de finalización (formato "HH:mm")
  status: string;        // Estado de la sesión (ej: "confirmed", "pending")
  mode: string;           // Modo de la sesión (ej: "videollamada", "presencial")
  notes: string ;            // Notas adicionales
  constructor() {
    this.id = 0;
    this.studentId = 0;
    this.type = "";
    this.date = " ";
    this.time =" ";
    this.endTime = " ";
    this.status = " ";
    this.mode = " ";
    this.notes = " ";
  }
}
