export const symptomsMap = {
  dispnea: 'Dificultad para respirar',
  fever: 'Fiebre mayor a 38°C',
  cough: 'Tos seca persistente',
  soarThroat: 'Dolor de garganta',
  anosmia: 'Perdida de olfato o del gusto',
  fatigue: 'Fatiga',
  noAppetite: 'Perdida de apetito',
  musclePain: 'Dolor muscular'
}

export const ratingMap = {
  high: 'Riesgo Alto',
  medium: 'Riesgo Medio',
  low: 'Riesgo Bajo'
}

export const ratingColors = {
  high: '#f44336',
  medium: '#ffb300',
  low: '#388e3c'
}

export const feelingMap = {
  good: 'Bien',
  regular: 'Regular',
  bad: 'Mal',
  veryBad: 'Muy mal'
}

export const symptoms = [
  { label: 'Dificultad para respirar', value: 'dispnea' },
  { label: 'Fiebre mayor a 38°C', value: 'fever' },
  { label: 'Tos seca persistente', value: 'cough' },
  { label: 'Dolor de garganta', value: 'soarThroat' },
  { label: 'Fatiga', value: 'fatigue' },
  { label: 'Perdida de olfato o del gusto', value: 'anosmia' },
  { label: 'Perdida de apetito', value: 'noAppetite' },
  { label: 'Dolor muscular', value: 'musclePain' }
]

export const conditions = [
  { label: 'Embarazo', value: 'pregnant' },
  { label: 'Diabético', value: 'diabetes' },
  { label: 'Cardiópata', value: 'cardiac' },
  { label: 'Hipertenso', value: 'hypertension' },
  { label: 'Padecimientos pulmonares', value: 'lungDisease' },
  { label: 'Cáncer', value: 'cancer' },
  { label: 'Enfermedad inmunológica', value: 'immuneDisease' },
  { label: 'Enfermedad renal crónica', value: 'kidneyDisease' },
  { label: 'Enfermedad hepática crónica', value: 'hepatic' }
]

export const contacts = [
  {
    label: 'Realizado un viaje fuera del país en los últimos 30 días.',
    value: 'traveled'
  },
  {
    label: 'Contacto cercano con algún paciente diagnosticado con COVID-19.',
    value: 'closeContact'
  }
]

export const emojis = [
  { type: 'smile', value: 'good', label: 'Bien' },
  { type: 'neutral', value: 'regular', label: 'Regular' },
  { type: 'sad', value: 'bad', label: 'Mal' },
  { type: 'sick', value: 'veryBad', label: 'Muy mal' }
]
