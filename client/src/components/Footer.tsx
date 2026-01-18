export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto w-full">
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CySecK</h3>
            <p className="text-gray-400 text-sm">
              Centre of Excellence in Cybersecurity Karnataka
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">
              Indian Institute of Science
              <br />
              Bangalore – 560012
              <br />
              contact.cyseck@fsid-iisc.in
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © 2026 CySecK. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};
