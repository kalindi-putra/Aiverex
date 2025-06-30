import { 
  AppstoreOutlined,
  MessageOutlined,
  UserOutlined,
  BugOutlined,
  FormOutlined,
  FileProtectOutlined,
  PlusCircleOutlined,

} from "@ant-design/icons";
const NavLinks = [
    {
        name: "Home",
        link: "/home"

    },
    {
        name: "Courses",
        link: "/courses"
    },
    {
        name: "Review",
        link: "/review"
    },
    {
        name: "PostCode",
        link: "/post"
    },
    {
        name: "Mentors",
        link: "/mentors"
    },
    {
        name: "Login",
        link: "/login"
    },
    {
        name: "Register",
        link: "/register"
    },
    {
      name: "logout",
      link: "/login",
    },
    [
        {
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            name: "Edit Profile",
            link: "/editprofile"
        },
        {
            name: "Message",
            link: "/message"
        },
        {
            name: "Settings",
            link: "/settings"
        },
        {
            name: "Logout",
            link: "/logout"
        },
    ]
]
const ExpertsData = [
    
    {
      id:1,
      name: 'Martina doena',
      title: 'Web Developer',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1474.jpg',
      description: 'Highly proficient in Web3 and AI and professional in Designing Websites with tools of Web3.0.',
    },
    {
      id:2,
      name:'Zaid S.',
      description:'A professional web designer with a wealth of knowledge about the web Development and Software Development.',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg',
    },
    {
      id:3,
      name:'Jhon Doe',
      description:'Expert in all aspects of coding and knowledgeable about a wide range of coding languages',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg',
    },
    {
      id:4,
      name: 'Martina doena',
      title: 'Web Developer',
      img:'https://img.freepik.com/free-vector/teaching-concept-illustration_114360-1708.jpg',
      description: 'Highly proficient in Web3 and AI and professional in Designing Websites with tools of Web3.0.',
    },
    {
      id:5,
      name: ' doena',
      title: 'Web Developer',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1474.jpg',
      description: 'Highly proficient in Web3 and AI and professional in Designing Websites with tools of Web3.0.',
    },
    {
      id:6,
      name:'Zaid.',
      description:'A professional web designer with a wealth of knowledge about the web Development and Software Development.',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg',
    },
    {
      id:7,
      name:'Jhon',
      description:'Expert in all aspects of coding and knowledgeable about a wide range of coding languages',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg',
    },
    {
      id:8,
      name: 'Martina',
      title: 'Web Developer',
      img:'https://img.freepik.com/free-vector/teaching-concept-illustration_114360-1708.jpg',
      description: 'Highly proficient in Web3 and AI and professional in Designing Websites with tools of Web3.0.',
    },
    {
      id:9,
      name:'Ajay Rao',
      description:'A professional web designer with a wealth of knowledge about the web Development and Software Development.',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg',
    },
    {
      id:10,
      name:'Jhon Doe',
      description:'Expert in all aspects of coding and knowledgeable about a wide range of coding languages',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg',
    },
    {
      id:11,
      name:'David Milly',
      description:'Expert in all aspects of coding and knowledgeable about a wide range of coding languages',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg',

    },
    {
      id:12,
      name:'Millie Bobby Brown',
      description:'A very talented and hardworking person with a lot of experience in the field of web development and software development.',
      img:'https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg',
    },
  ]

  const MentItems = [
    {
        label: 'Dashboard',
        icon:<AppstoreOutlined />,
        key: '/home',
    },
    {
        label: 'Notifications',
        icon:<MessageOutlined/>,
        key: '/home/notify',
    },
    {
        label: 'Edit Profile',
        icon:<PlusCircleOutlined />,
        key: '/home/edit',
    },
    {
        label: 'Review Page',
        icon:<FileProtectOutlined />,
        key: '/home/review',
    },
    // {
    //     label: 'Pending Reviews',
    //     icon:<BugOutlined/>,
    //     key: 'pending',
    // },
    // {
    //     label: 'Profile',
    //     icon:<UserOutlined />,
    //     key: '/profile',
    // },
    // {
    //     label: 'Add Course',
    //     icon:<FormOutlined />,
    //     key: '/add-course',
    // },
    // {
    //     label: 'Add Test',
    //     icon:<FormOutlined />,
    //     key: '/add-test',
    // },
    // {
    //     label: 'Add Question',
    //     icon:<FormOutlined />,
    //     key: '/add-question',
    // },
    // {
    //     label: 'Add Mentor',
    //     icon:<FormOutlined />,
    //     key: '/add-mentor',
    // },
    // {
    //     label: 'Add Student',
    //     icon:<FormOutlined />,
    //     key: '/add-student',
    // },
    // {
    //     label: 'Add Review',
    //     icon:<FormOutlined />,
    //     key: '/add-review',
    // },
    // {
    //     label: 'Add Post',
    //     icon:<FormOutlined />,
    //     key: '/add-post',
    // },
    // {
    //     label: 'Add Message',
    //     icon:<FormOutlined />,
    //     key: '/add-message',
    // },

]

const StudentItems = [
  {
      label: 'Dashboard',
      icon:<AppstoreOutlined />,
      key: '/home',
  },
  {
      label: 'Notifications',
      icon:<MessageOutlined/>,
      key: '/home/notify',
  },
  {
      label: 'Edit Profile',
      icon:<PlusCircleOutlined />,
      key: '/home/edit',
  },
  // {
  //     label: 'Reviews',
  //     icon:<FileProtectOutlined />,
  //     key: 'ment-reviews',
  // },
  // {
  //     label: 'Pending Reviews',
  //     icon:<BugOutlined/>,
  //     key: 'pending',
  // },
  // {
  //     label: 'Profile',
  //     icon:<UserOutlined />,
  //     key: '/profile',
  // },
  // {
  //     label: 'Add Course',
  //     icon:<FormOutlined />,
  //     key: '/add-course',
  // },
  // {
  //     label: 'Add Test',
  //     icon:<FormOutlined />,
  //     key: '/add-test',
  // },
  // {
  //     label: 'Add Question',
  //     icon:<FormOutlined />,
  //     key: '/add-question',
  // },
  // {
  //     label: 'Add Mentor',
  //     icon:<FormOutlined />,
  //     key: '/add-mentor',
  // },
  // {
  //     label: 'Add Student',
  //     icon:<FormOutlined />,
  //     key: '/add-student',
  // },
  // {
  //     label: 'Add Review',
  //     icon:<FormOutlined />,
  //     key: '/add-review',
  // },
  // {
  //     label: 'Add Post',
  //     icon:<FormOutlined />,
  //     key: '/add-post',
  // },
  // {
  //     label: 'Add Message',
  //     icon:<FormOutlined />,
  //     key: '/add-message',
  // },

]
const progress = [
  {
    name: 'C',
    marks: 415,
    color: '#6B11DC',
  },
  {
    name: 'C++',
    marks: 330,
    color: '#6B11DC',
  },
  {
    name: 'Java',
    marks: 457,
    color: '#6B11DC',
  },
  {
    name: 'C',
    marks: 415,
    color: '#6B11DC',
  },
  {
    name: 'C++',
    marks: 330,
    color: '#6B11DC',
  },
  {
    name: 'Java',
    marks: 457,
    color: '#6B11DC',
  },
]
const CourseList = [
  {
      id: 1,
      name: 'React',
      img:'/assets/course.png',
      description: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.',
      price: 5000,
      duration: '2 months',
  },
  {
      id: 2,
      name: 'Angular',
      img:'/assets/course2.png',
      description: 'Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.',
      price: 6000,
      duration: '2 months',
  },
  {
      id: 3,
      name: 'Vue',
      img:'/assets/course3.png',
      description: 'Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.',
      price: 4000,
      duration: '2 months',
  },
  {
      id: 4,
      name: 'Vue',
      img:'/assets/course2.png',
      description: 'Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.',
      price: 4000,
      duration: '2 months',
  },
  {
      id:5,
      name:'SQL',
      img:'/assets/course.png',
      description:'SQL is a domain-specific language used in programming and designed for managing data held in a relational database management system, or for stream processing in a relational data stream management system.',
      price:3000,
      duration:'2 months',
  },
  {
      id:6,
      name:'Python',
      img:'/assets/course3.png',
      description:'Python is an interpreted high-level general-purpose programming language. Python\'s design philosophy emphasizes code readability with its notable use of significant indentation.',
      price:3000,
      duration:'2 months',
  },
  {
      id:7,
      name:'Java',
      img:'/assets/course2.png',
      description:'Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
      price:3000,
      duration:'2 months',
  },
  {
      id:8,
      name:'C++',
      img:'/assets/course.png',
      description:'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes".',
      price:3000,
      duration:'2 months',
  },
  {
      id:9,
      name:'C',
      img:'/assets/course3.png',
      description:'C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system.',
      price:3000,
      duration:'2 months',
  },
  {
      id:10,
      name:'JavaScript',
      img:'/assets/course2.png',
      description:'JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.',
      price:3000,
      duration:'2 months',
  },
]
const tags = [
  {
    name: 'C',
    color: '#6B11DC',
  },
  {
    name: 'C++',
    color: '#6B11DC',
  },
  {
    name: 'Java',
    color: '#6B11DC',
  },
  {
    name:'React JS',
    color:'#6B11DC',
  },
  {
    name:'Angular',
    color:'#6B11DC',
  },
  {
    name:'Vue JS',
    color:'#6B11DC',
  }
]

const ProblemStatement = `
Snow Howler is the librarian at the central library of the city of HuskyLand. He must handle requests which come in the following forms:
\\n
1 x y : Insert a book with  pages at the end of the  shelf.
\\n
2 x y : Print the number of pages in the  book on the  shelf.
\\n
3 x : Print the number of books on the  shelf.
\\n
Snow Howler has got an assistant, Oshie, provided by the Department of Education. Although inexperienced, Oshie can handle all of the queries of types 2 and 3.
\\n
Help Snow Howler deal with all the queries of type 1.
\\n
Oshie has used two arrays:\\n
"""
int* total_number_of_books;\\n
/*\\n
 * This stores the total number of books on each shelf.\\n
 */\\n
\\n
int** total_number_of_pages;\\n
/*\\n
 * This stores the total number of pages in each book of each shelf.\\n
 * The rows represent the shelves and the columns represent the books.\\n
 */
 """\\n
 Input Format\\n
 \\n
 The first line contains an integer , the number of shelves in the library.\\n
 The second line contains an integer , the number of requests.\\n
 Each of the following  lines contains a request in one of the three specified formats.\\n
 \\n
 Constraints\\n
 \\n
 For each query of the second type, it is guaranteed that a book is present on the  shelf at  index.\\n
 Both the shelves and the books are numbered starting from 0.\\n
 Maximum number of books per shelf .\\n
 \\n
 Sample Input 0\\n
"""5\\n
1 0 1\\n
1 0 2\\n
1 2 7\\n
2 2 0\\n
3 0
"""\\n
Explanation 0\\n
\\n
There are  shelves and  requests, or queries.\\n
- 1 Place a  page book at the end of shelf .\\n
- 2 Place a  page book at the end of shelf .\\n
- 3 Place a  page book at the end of shelf .\\n
- 4 The number of pages in the  book on the  shelf is 78.\\n
- 5 The number of books on the  shelf is 2.\\n
`

  


export { NavLinks,ExpertsData,MentItems,StudentItems,tags,CourseList,progress,ProblemStatement}