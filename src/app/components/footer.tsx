import Link from "next/link";

interface FooterColumn {
  title: string;
  links: string[];
}

const Footer: React.FC = () => {
  const footerLinks: FooterColumn[] = [
    { title: "Company", links: ["About Us", "Careers", "Press"] },
    { title: "Support", links: ["FAQ", "Help Center", "Contact Us"] },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Preferences"],
    },
    { title: "Social", links: ["Twitter", "Facebook", "Instagram"] },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#" className="hover:text-teal-400 transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Lex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
