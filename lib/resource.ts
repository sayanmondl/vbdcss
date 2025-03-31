export interface Resource {
  id: string;
  name: string;
  description: string;
  type: "code" | "notes" | "pyqs";
  fileUrl?: string;
  subject: string;
  uploader: string;
}

export async function getResources() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      name: "Introduction to Algorithms Notes",
      description: "Detailed notes on sorting and searching algorithms.",
      type: "notes",
      fileUrl: "https://example.com/algorithms-notes.pdf",
      subject: "Algorithms",
      uploader: "S123456",
    },
    {
      id: "2",
      name: "Computer Networks Code Examples",
      description: "Sample C programs for socket programming.",
      type: "code",
      fileUrl: "https://example.com/networks-code.zip",
      subject: "Computer Networks",
      uploader: "S987654",
    },
    {
      id: "3",
      name: "Machine Learning PYQs",
      description: "Previous year questions for Machine Learning exams.",
      type: "pyqs",
      fileUrl: "https://example.com/ml-pyqs.pdf",
      subject: "Machine Learning",
      uploader: "S246810",
    },
    {
      id: "4",
      name: "Operating Systems Notes",
      description:
        "Lecture notes covering process scheduling and memory management.",
      type: "notes",
      fileUrl: "https://example.com/os-notes.pdf",
      subject: "Operating Systems",
      uploader: "S135790",
    },
    {
      id: "5",
      name: "Data Structures Implementation",
      description: "C++ implementations of linked lists, stacks, and queues.",
      type: "code",
      fileUrl: "https://example.com/ds-code.zip",
      subject: "Data Structures",
      uploader: "S112233",
    },
    {
      id: "6",
      name: "Advanced Algorithms Notes",
      description:
        "In-depth analysis of dynamic programming and graph algorithms.",
      type: "notes",
      fileUrl: "https://example.com/advanced-algorithms.pdf",
      subject: "Algorithms",
      uploader: "S667788",
    },
    {
      id: "7",
      name: "Computer Networks Lab Programs",
      description: "Network simulation projects using NS2 and Wireshark.",
      type: "code",
      fileUrl: "https://example.com/networks-lab.zip",
      subject: "Computer Networks",
      uploader: "S998877",
    },
    {
      id: "8",
      name: "Machine Learning Assignments",
      description: "Hands-on ML projects with Python and TensorFlow.",
      type: "code",
      fileUrl: "https://example.com/ml-assignments.zip",
      subject: "Machine Learning",
      uploader: "S554433",
    },
    {
      id: "9",
      name: "Operating Systems PYQs",
      description: "Previous year exam questions on OS concepts.",
      type: "pyqs",
      fileUrl: "https://example.com/os-pyqs.pdf",
      subject: "Operating Systems",
      uploader: "S334455",
    },
    {
      id: "10",
      name: "Java Programming Guide",
      description:
        "Comprehensive notes on Java syntax, OOP, and multithreading.",
      type: "notes",
      fileUrl: "https://example.com/java-guide.pdf",
      subject: "Java",
      uploader: "S112299",
    },
    {
      id: "11",
      name: "Data Structures Past Papers",
      description: "Previous year questions on stacks, queues, and trees.",
      type: "pyqs",
      fileUrl: "https://example.com/ds-pyqs.pdf",
      subject: "Data Structures",
      uploader: "S445566",
    },
    {
      id: "12",
      name: "Artificial Intelligence Notes",
      description: "Fundamentals of AI, search algorithms, and expert systems.",
      type: "notes",
      fileUrl: "https://example.com/ai-notes.pdf",
      subject: "Artificial Intelligence",
      uploader: "S776655",
    },
    {
      id: "13",
      name: "Machine Learning Lecture Notes",
      description: "Neural networks, supervised and unsupervised learning.",
      type: "notes",
      fileUrl: "https://example.com/ml-lecture-notes.pdf",
      subject: "Machine Learning",
      uploader: "S223344",
    },
    {
      id: "14",
      name: "Operating Systems Code",
      description: "Implementation of memory management algorithms.",
      type: "code",
      fileUrl: "https://example.com/os-code.zip",
      subject: "Operating Systems",
      uploader: "S778899",
    },
    {
      id: "15",
      name: "Blockchain Fundamentals",
      description: "Notes explaining blockchain concepts and cryptocurrencies.",
      type: "notes",
      fileUrl: "https://example.com/blockchain-notes.pdf",
      subject: "Blockchain",
      uploader: "S556677",
    },
    {
      id: "16",
      name: "Cyber Security Code Snippets",
      description: "Secure authentication and encryption techniques in Python.",
      type: "code",
      fileUrl: "https://example.com/cybersecurity-code.zip",
      subject: "Cyber Security",
      uploader: "S990011",
    },
    {
      id: "17",
      name: "Java Design Patterns",
      description: "Notes on commonly used design patterns in Java.",
      type: "notes",
      fileUrl: "https://example.com/java-design-patterns.pdf",
      subject: "Java",
      uploader: "S332211",
    },
    {
      id: "18",
      name: "Artificial Intelligence PYQs",
      description: "Previous year questions related to AI concepts.",
      type: "pyqs",
      fileUrl: "https://example.com/ai-pyqs.pdf",
      subject: "Artificial Intelligence",
      uploader: "S998811",
    },
    {
      id: "19",
      name: "Computer Graphics Lab Work",
      description: "OpenGL projects and rendering techniques.",
      type: "code",
      fileUrl: "https://example.com/graphics-lab.zip",
      subject: "Computer Graphics",
      uploader: "S665544",
    },
    {
      id: "20",
      name: "Compilers Notes",
      description:
        "Lexical analysis, syntax parsing, and optimization techniques.",
      type: "notes",
      fileUrl: "https://example.com/compilers-notes.pdf",
      subject: "Compilers",
      uploader: "S223344",
    },
  ];
}
