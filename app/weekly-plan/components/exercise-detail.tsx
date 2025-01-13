import { DetailPopup } from './detail-popup'
import { exerciseDetails } from '../data/exercise-details'

interface ExerciseDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exerciseId: string
}

export function ExerciseDetail({ open, onOpenChange, exerciseId }: ExerciseDetailProps) {
  const exercise = exerciseDetails[exerciseId]

  if (!exercise) {
    return null
  }

  const sections = [
    {
      title: "EQUIPMENT",
      content: (
        <ul className="space-y-2">
          {exercise.equipment.map((item, index) => (
            <li key={index} className="text-[15px] text-[#414141]">
              • {item}
            </li>
          ))}
        </ul>
      )
    },
    {
      title: "INSTRUCTIONS",
      content: (
        <div className="space-y-6">
          {exercise.instructions.map((section, index) => (
            <div key={index} className="space-y-3">
              <h4 className="font-medium">{section.title}</h4>
              {Array.isArray(section.content) ? (
                <ol className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-[15px] text-[#414141] pl-8 relative">
                      <span className="absolute left-0 font-medium text-black">
                        {itemIndex + 1}.
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-[15px] text-[#414141]">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      )
    }
  ]

  return (
    <DetailPopup
      open={open}
      onOpenChange={onOpenChange}
      title={exercise.title}
      subtitle={exercise.description}
      duration={exercise.totalTime}
      image={exercise.image}
      sections={sections}
    />
  )
}

