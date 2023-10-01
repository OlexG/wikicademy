import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3); // Assuming you'll use this for some dynamic content

  return (
    <div class="mx-auto bg-soft-white min-h-screen">
      {/* Header */}
      <header class="flex justify-between items-center py-6 px-4">
        <div class="text-dark-charcoal text-2xl font-bold">Wikicademy</div>
        <nav>
          <ul class="flex space-x-4">
            <li><a href="#" class="text-teal hover:text-warm-beige">Home</a></li>
            <li><a href="#" class="text-dark-charcoal hover:text-teal">Courses</a></li>
            <li><a href="#" class="text-dark-charcoal hover:text-teal">About</a></li>
            <li><a href="#" class="text-dark-charcoal hover:text-teal">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-10">
        <h1 class="text-4xl text-dark-charcoal mb-6">Welcome to Wikicademy</h1>
        <p class="text-grey leading-relaxed mb-6">Your portal to knowledge, tutorials, and courses. Dive into a world of understanding and expand your horizon.</p>
        <a href="#" class="text-teal hover:text-warm-beige underline">Explore our courses</a>
      </main>
    </div>
  );
}
