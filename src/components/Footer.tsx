import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { SiBento } from "react-icons/si"
import { FaGoogleScholar } from "react-icons/fa6"

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            {[
              { href: "https://github.com/meghna-cse", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/meghna-j/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:mxj3631@mavs.uta.edu", icon: Mail, label: "Email" },
              {
                href: "https://scholar.google.com/citations?user=AwP-oyQAAAAJ&hl",
                icon: FaGoogleScholar,
                label: "Google Scholar",
              },
              { href: "https://bento.me/meghna-j", icon: SiBento, label: "Bento" },
            ].map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon className="h-6 w-6" />
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Meghna J. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer

