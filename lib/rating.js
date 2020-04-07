const getScore = (person = {}) => {
  const { symptoms = [], risk = [], age = 0 } = person

  if (!age || !symptoms || !risk) {
    return 0
  }

  let score = 0

  // MAJOR SYMPTOMS
  if (symptoms.includes('fever')) {
    score += 90.5
  }

  if (symptoms.includes('cough')) {
    score += 70.5
  }

  if (symptoms.includes('fatigue')) {
    score += 53.5
  }

  if (symptoms.includes('noAppetite')) {
    score += 40
  }

  if (symptoms.includes('dispnea')) {
    score += 31
  }

  // if (symptoms.includes('sputum')) {
  //   score += 29.5
  // }

  if (symptoms.includes('musclePain')) {
    score += 27.5
  }

  if (symptoms.includes('anosmia')) {
    score += 15
  }

  // MINOR SYMPTOMS
  if (symptoms.includes('soarThroat')) {
    score += 11
  }

  // if (symptoms.includes('chills')) {
  //   score += 11
  // }

  if (symptoms.includes('headache')) {
    score += 10
  }

  if (symptoms.includes('diarrhoea')) {
    score += 9
  }

  // EMERGENCY

  // if (symptoms.includes('chestPain')) {
  //   score += 100
  // }

  // if (symptoms.includes('bluishFace')) {
  //   score += 100
  // }

  // if (symptoms.includes('confusion')) {
  //   score += 100
  // }

  if (risk.includes('traveled')) {
    score += 100
  }

  if (risk.includes('closeContact')) {
    score += 100
  }

  if (age < 5 || age >= 60) {
    score += 51.9
  }

  if (risk.length > 0) {
    score += 51.9
  }

  // score += ['bad', 'veryBad'].includes(person.feeling) ? 0.5 : 0
  return score
}

const getRating = score => {
  if (score <= 212) {
    return 'low'
  }

  if (score <= 260) {
    return 'medium'
  }

  return 'high'
}

export default person => {
  const score = getScore(person)
  const rating = getRating(score)
  return { ...person, score, rating }
}

// < 22 L
// > 22 & < 38 M
// > 38 H

// 10 + 8 + 5 + 4 + 3 + 1 + 1 + 1 + 14 + 10 + 10 + 5 = 72 //  H
// 10 + 8 + 5 + 0 + 0 + 0 + 0 + 0 + 14 + 0 + 0 + 5 = 39 //  H
//  0 + 0 + 5 + 4 + 3 + 0 + 0 + 0 + 14 + 0 + 0 + 0 = 26 //  M
// 10 + 8 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 5 = 23 //  M
// 10 + 8 + 0 + 0 + 0 + 0 + 0 + 0 + 13 + 0 + 0 + 0 = 31 //  M
// 0 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 14 + 5 + 5 + 0 = 24 //  M

// 5 + 0.5 + 1.5 + 1.5 = 8.5 = H
// 4 + 0.5 + 1.5 + 1.5 = 7.5 = H
// 3 + 0.5 + 1.5 + 1.5 = 6.5 = H
// 2 + 0.5 + 1.5 + 1.5 = 5.5 = H
// 1 + 0.5 + 1.5 + 1.5 = 4.5 = M

// 5 + 0 + 1.5 + 1.5 = 8 = H
// 4 + 0 + 1.5 + 1.5 = 7 = H
// 3 + 0 + 1.5 + 1.5 = 6 = H
// 2 + 0 + 1.5 + 1.5 = 5 = M
// 1 + 0 + 1.5 + 1.5 = 4 = M

// 5 + 0 + 0 + 1.5 = 6.5 = H
// 4 + 0 + 0 + 1.5 = 5.5 = H
// 3 + 0 + 0 + 1.5 = 4.5 = M
// 2 + 0 + 0 + 1.5 = 3.5 = M
// 1 + 0 + 0 + 1.5 = 2.5 = L

// 5 + 0 + 1.5 + 0 = 6.5 = H
// 4 + 0 + 1.5 + 0 = 5.5 = H
// 3 + 0 + 1.5 + 0 = 4.5 = M
// 2 + 0 + 1.5 + 0 = 3.5 = M
// 1 + 0 + 1.5 + 0 = 2.5 = L

// 5 + 0 + 0 + 0 = 5 = H
// 4 + 0 + 0 + 0 = 4 = H
// 3 + 0 + 0 + 0 = 3 = M
// 2 + 0 + 0 + 0 = 2 = L
// 1 + 0 + 0 + 0 = 1 = L

// 2 + 0.5 + 0 + 0 = 2.5
// 1 + 0.5 + 0 + 0 = 1.5
// 0 + 0 + 1.5 + 1.5 = 3
// 0 + 0 + 1.5 + 0 = 1.5
// 0 + 0 + 0 + 1.5 = 1.5

// COVID-19 Positive Symptoms

// 6 MAJOR SYMPTOMS
// fever = 90.5
// cough = 70.5
// fatigue = 53.5
// No appetite = 40
// Sputum = 29.5
// Muscle or bone pain = 27.5

// 4 MINOR SYMPTOMS
// Sore throat = 11
// Chills (feel cold) = 11
// Headache or dizziness = 10
// Nausea, vomiting, or diarrhea = 9

// Loss of smell or taste = 15

// LIVE THREATENING
// breathing difficulty = 135
// Chest pain, chest pressure, or irregular heartbeat = 100
// Bluish lips or face = 100
// Confusion = 100

// RISK AJUSTING FACTOR
// Chronic disease = 51.9
// Older than 50 years old or younger than 5 years old = 51.9

// If score is above 212 then go to doctor

// Total = 891

// ===================================

// 6 MAJOR SYMPTOMS
// fever = 90.5
// cough = 70.5
// fatigue = 53.5
// Sputum = 29.5
// Muscle or bone pain = 27.5
