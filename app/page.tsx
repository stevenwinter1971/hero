import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/survey/step1')
}

