import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 pb-10 font-sans">
      <Header />
      <main className="max-w-5xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <About />
          <Education />
        </div>
        <div className="space-y-6">
          <Skills />
          <Projects />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;