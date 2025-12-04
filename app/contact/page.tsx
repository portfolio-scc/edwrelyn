const Contact = () => {
  const contactInfo = [
    {
      label: "Email",
      value: "buhianedwrelyn30@gmail.com",
      link: "mailto:buhianedwrelyn30@gmail.com"
    },
    {
      label: "Phone",
      value: "0993-918-1925",
      link: "tel:+639939181925"
    },
    {
      label: "Location",
      value: "General Trias, Cavite",
      link: null
    }
  ]

  const socialLinks = [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/share/1Bj9LWcXZx/?mibextid=wwXIfr",
      handle: "@edswrelyn"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/edswrelyn_?igsh=MXFxZ29vamVzMWlxaA%3D%3D&utm_source=qr",
      handle: "@edswrelyn_"
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/ebuhian",
      handle: "ebuhian"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-8">Get in Touch</h1>
      
      <div className="prose prose-lg mb-16">
        <p className="text-lg text-neutral-700 leading-relaxed">
          I'm always open to new opportunities, collaborations, or just a friendly conversation. 
          Feel free to reach out through any of the channels below.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
        <div className="space-y-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-start border-b border-neutral-200 pb-4">
              <span className="font-semibold w-32 text-neutral-600">{info.label}</span>
              {info.link ? (
                <a 
                  href={info.link}
                  className="text-black hover:underline"
                >
                  {info.value}
                </a>
              ) : (
                <span className="text-black">{info.value}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Social Media</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-200 p-6 hover:border-black hover:bg-neutral-50 transition-all group"
            >
              <h3 className="font-semibold mb-2 group-hover:underline">{social.platform}</h3>
              <p className="text-sm text-neutral-600">{social.handle}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-neutral-200 pt-8">
        <p className="text-sm text-neutral-600 text-center">
          Available for service consultation, technical support, event hosting, and administrative roles.
        </p>
      </section>
    </div>
  )
}

export default Contact
