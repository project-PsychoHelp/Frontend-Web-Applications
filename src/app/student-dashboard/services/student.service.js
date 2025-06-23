const API_URL = 'http://localhost:3000/students';

export async function getStudentById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Student not found');
  return response.json();
}

export async function getAllStudents() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch students');
  return response.json();
}
