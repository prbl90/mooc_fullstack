const supertest = require('supertest');
const { app, server } = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

describe('get /api/blogs tests', async () => {
    let authToken = '';
    beforeAll(async () => {
        await Blog.remove({});

        const blogs = [
            {
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 7,
                user: '5bc43c2bda378129bc10afe5'
            },
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                user: '5bc43c2bda378129bc10afe5'
            },
            {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                user: '5bc43c2bda378129bc10afe5'
            },
            {
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 10,
                user: '5bc43c2bda378129bc10afe5'
            },
            {
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                user: '5bc43c2bda378129bc10afe5'
            },
            {
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                user: '5bc43c2bda378129bc10afe5'
            }
        ];
        const blogObjects = blogs.map(n => new Blog(n));
        await Promise.all(blogObjects.map(n => n.save()));

        const result = await api.post('/api/login').send({username: 'testiboi', password: 'trololo'});
        authToken = result.body.token;

    });

    test('notes are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('there are 6 blogs', async () => {
        const response = await api
            .get('/api/blogs');

        expect(response.body.length).toBe(6);
    });

    test('add blog', async () => {
        const newBlog = {
            title: 'Type wars 2: The New Hope',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars2.html',
            likes: 15,
        };

        await api
            .post('/api/blogs').set('Authorization', authToken)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

    });

    test('there are 7 blogs', async () => {
        const response = await api
            .get('/api/blogs');

        expect(response.body.length).toBe(7);
    });

    test('add blog without likes', async () => {
        const newBlog = {
            title: 'Cannon reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD8666.html'
        };

        await api
            .post('/api/blogs').set('Authorization', authToken)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsInDb = await api
            .get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);


        const newBlogFromDb = blogsInDb.body.find((blog) => { return blog.title === newBlog.title; });
        expect(newBlogFromDb).not.toBe(undefined);
        expect(newBlogFromDb.likes).toBe(0);

    });
});

afterAll(() => {
    server.close();
});