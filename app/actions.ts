'use server'

export async function submitSurvey(formData: FormData) {
  // Here you would typically save the form data to a database
  // For this example, we'll just log it
  console.log('Survey submitted:', Object.fromEntries(formData))
  
  // Redirect to a thank you page
  return { success: true, message: 'Survey submitted successfully!' }
}

