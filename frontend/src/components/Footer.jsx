import { MapPin, Mail, Phone} from "lucide-react"

import { RiInstagramLine, RiLinkedinLine, RiYoutubeLine} from "react-icons/ri"


const socialLinks = [
  { icon: RiInstagramLine, href: "#", label: "Instagram" },
  { icon: RiLinkedinLine, href: "#", label: "Linkedin" },
  { icon: RiYoutubeLine, href: "#", label: "YouTube" },
]

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-3 gap-12 items-start">

          {/* Col 1 — Description */}
          <div className="flex flex-col justify-center h-full pr-8">
            <p className="text-background/60 text-sm leading-relaxed">
              Explore all of Banyuwangi Destination. Every experience
              become a lasting memory. Thank you for visiting Banyuwangi.
              We look forward to welcoming you again.
            </p>
          </div>

          {/* Divider */}
          <div className="border-l border-background/10 pl-12">
            <h3 className="text-background mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-background/60 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-accent" />
                <span>Jl. Kh. Abdul Basyar No. 1,<br />Banyuwangi, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-background/60 text-sm">
                <Mail size={16} className="flex-shrink-0 text-accent" />
                <a href="mailto:syambudiadib@gmail.com" className="hover:text-accent transition-colors">
                  syambudiadib@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/60 text-sm">
                <Phone size={16} className="flex-shrink-0 text-accent" />
                <a href="tel:+6281336803385" className="hover:text-accent transition-colors">
                  +62 81336803385
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 — Follow Us */}
          <div className="border-l border-background/10 pl-12">
            <h3 className="text-background mb-6">Follow Us</h3>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-background/20
                             flex items-center justify-center text-background/60
                             hover:border-accent hover:text-accent
                             transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-background/10 text-center text-background/30 text-xs">
          © {new Date().getFullYear()} Moh Adib Syambudi. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer