const LifeAtSCC = () => {
  const hostingEvents = [
    "Year-End Party 2022 - 2024",
    "NSTP-NSRC CIPAG Program",
    "Project ABAKADA",
    "Project HANDA",
    "PAMPULA 2023",
    "Teacher's Day 2024",
    "General Assembly for Computer Engineering Students 2024 - 2025"
  ]

  const positions = [
    {
      title: "Student Assistant",
      period: "September 2023 - December 2024",
      responsibilities: [
        "Supported administrative tasks and documentation for faculty.",
        "Helped with student coordination during campus events.",
        "Maintained organized records and assisted with office operations."
      ]
    },
    {
      title: "Secretary — NSTP - NSRC SCCGTI Chapter",
      period: "March 2023 - June 2023",
      responsibilities: [
        "Managed records, documentation, and communication for community service activities.",
        "Organized meetings and assisted officers with logistics and coordination.",
        "Recognized as an Outstanding NSTP-NSRC Officer.",
        "Contributed to programs that earned the organization 3rd Place for Best Innovative Program in the 1st Gawad Pawid — Province of Cavite."
      ]
    },
    {
      title: "Secretary — Student Professional Alliance of Computer Engineering Students",
      period: "November 2022 - June 2023",
      responsibilities: [
        "Assisted with event planning for Computer Engineering students.",
        "Managed minutes, communication, and promotions for organizational activities."
      ]
    },
    {
      title: "Secretary — Central Student Council",
      period: "October 2023 - June 2025",
      responsibilities: [
        "Served as secretary for the entire student body.",
        "Handled documentation, student concerns, meeting minutes, and official communications."
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-8">Life at SCC</h1>
      
      <div className="prose prose-lg mb-16">
        <p className="text-lg text-neutral-700 leading-relaxed">
          Samuel Christian College shaped not just my academic journey but also my growth as a communicator, 
          leader, and student representative.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Event Host</h2>
        <p className="text-neutral-700 mb-6">
          One of the most memorable parts of my SCC journey was becoming an event host/emcee for school-wide 
          activities and organizational events.
        </p>
        <div className="bg-neutral-50 border border-neutral-200 p-6">
          <h3 className="font-semibold mb-4">Events Hosted:</h3>
          <ul className="space-y-2">
            {hostingEvents.map((event, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 text-black">▪</span>
                <span className="text-neutral-700">{event}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 border-b border-neutral-200 pb-4">Leadership Positions</h2>
        <div className="space-y-8">
          {positions.map((position, index) => (
            <div key={index} className="border-l-2 border-black pl-6">
              <h3 className="text-xl font-semibold">{position.title}</h3>
              <p className="text-sm text-neutral-500 mb-3">{position.period}</p>
              <ul className="space-y-2">
                {position.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-neutral-700 text-sm flex">
                    <span className="mr-2">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LifeAtSCC
