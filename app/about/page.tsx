const About = () => {
  const workExperiences = [
    {
      title: "Service Consultant",
      company: "AEG",
      period: "January 2025 - Present",
      responsibilities: [
        "Handles warranty claims, validates purchase documents, and checks consumer eligibility.",
        "Books technician visits and coordinates service schedules.",
        "Provides troubleshooting steps and manages customer expectations with clarity."
      ]
    },
    {
      title: "Technical Support Representative",
      company: "",
      period: "November 2021 - October 2022",
      responsibilities: [
        "Addressed mobile service concerns with clear troubleshooting.",
        "Provided top-notch customer service and handled escalated calls.",
        "Assisted clients using Apple, Samsung, and insurance services."
      ]
    },
    {
      title: "Quality Assurance Inspector",
      company: "",
      period: "April 2021 - September 2021",
      responsibilities: [
        "Conducted quality inspections and identified defects.",
        "Prepared reports and coordinated with production teams for corrective actions."
      ]
    },
    {
      title: "Sales Associate",
      company: "",
      period: "September 2019 - January 2021",
      responsibilities: [
        "Ensured accurate transactions and excellent customer interactions.",
        "Recommended products and maintained checkout efficiency."
      ]
    }
  ]

  const skills = [
    {
      category: "Customer Service & Support",
      description: "Skilled in handling inquiries, processing warranties, troubleshooting, and coordinating service appointments."
    },
    {
      category: "Technical Assistance",
      description: "Able to provide step-by-step support for mobile devices, basic programming, and appliance-related concerns."
    },
    {
      category: "Administrative & Documentation Support",
      description: "Experienced in record-keeping, report preparation, communication handling, and event coordination."
    },
    {
      category: "Event Hosting & Moderating",
      description: "Confident host for school events, assemblies, and programs, ensuring smooth flow and audience engagement."
    },
    {
      category: "Leadership & Organization",
      description: "Strong background in leading student activities, managing teams, and supporting school councils and organizations."
    },
    {
      category: "Creatives & Presentation",
      description: "Can create clean layouts, presentations, posters, and documents using Canva, PowerPoint, and Google Workspace."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-8">About Me</h1>
      
      <div className="prose prose-lg mb-16">
        <p className="text-lg text-neutral-700 leading-relaxed">
          I'm Edwrelyn Buhian, a Computer Engineering student with a solid background in customer service, 
          technical assistance, and administrative work. I'm comfortable in roles that require clear communication, 
          organization, and problem-solving.
        </p>
        <p className="text-lg text-neutral-700 leading-relaxed mt-4">
          I've worked across different industries—including retail and technical support—and I'm currently a 
          Service Consultant, assisting customers with warranty processing and service bookings.
        </p>
        <p className="text-lg text-neutral-700 leading-relaxed mt-4">
          At school, I've developed through leadership roles, event hosting, and active involvement in student 
          organizations. I aim to bring reliability, professionalism, and a practical approach to every team and 
          task I handle.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 border-b border-neutral-200 pb-4">Work Experience</h2>
        <div className="space-y-8">
          {workExperiences.map((exp, index) => (
            <div key={index} className="border-l-2 border-black pl-6">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              {exp.company && <p className="text-neutral-600 font-medium">{exp.company}</p>}
              <p className="text-sm text-neutral-500 mb-3">{exp.period}</p>
              <ul className="space-y-2">
                {exp.responsibilities.map((resp, idx) => (
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

      <section>
        <h2 className="text-3xl font-bold mb-8 border-b border-neutral-200 pb-4">What I Can Offer</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="border border-neutral-200 p-6 hover:border-black transition-colors">
              <h3 className="font-semibold mb-2">{skill.category}</h3>
              <p className="text-sm text-neutral-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
