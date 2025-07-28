import Link from "next/link";
import "./page.module.css"; // Import external CSS file

const tests = [
  { id: "java", name: "Java Certification" },
  { id: "cpp", name: "C++ Certification" },
  { id: "python", name: "Python Certification" },
];

export default function CertificationPage() {
  return (
    <main className="certification-page">
      <div className="container">
        <h1 className="title">Certification Tests</h1>
        <p className="subtitle">Select a test to begin your certification</p>

        <div className="test-grid">
          {tests.map((test) => (
            <div key={test.id} className="test-card">
              <h2 className="test-name">{test.name}</h2>
              <Link href={`/tests/${test.id}`} className="start-button">
                Start Test
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
