# Group 3 IoT-Project

## Running the project

Clone the repository using SSH
```bash
git clone git@github.com:Jetsku/iot-project.git
```
> This requires that you have added a [private key](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) on your account which is authorized to pull (read) the repository.

Clone the repository using HTTPS
```bash
git clone https://github.com/Jetsku/iot-project.git
```

Start by going to the cloned repository in a terminal

```bash
cd project-template
```

Then build the docker images and start the services

```bash
docker-compose build
docker-compose up
```

Or with a single command

```bash
docker-compose up --build
```

> Hit Ctrl+C to stop the processes

<details>
<summary> Optionally you can run the process in the background </summary>
<br>

Add `-d` to the docker-compose commands.

```bash
docker-compose build
docker-compose up -d
```

Or with a single command

```bash
docker-compose up --build -d
```

> `-d` comes from the word _detached_

To see if the project is running

```bash
docker-compose ps
```

To stop the running background processes and remove the built images

```bash
docker-compose down --rmi all --remove-orphans
```

> If the processes are not running `docker-compose down` also removes the _containers_ and images

If you don't want to remove the images, you can just run

```bash
docker-compose down
```

</details>

## Clearing the database

The database is stored in an [anonymous volume](https://docs.docker.com/storage/) which may be removed using

```bash
docker-compose down -v
```

> For instance, if you edit the [models](bacend/src/models/), you need to remove the database volume for the changes to get applied

## Using poster

> Poster uses Python 3, and older versions of it may cause problems
>
> Using poster requires that you have an instance of the project running somewhere

Poster is a tool that sends post requests to the backend simulating actual data for testing

Start by going to the poster folder

```bash
cd poster
```

Install dependencies
> You need pip or pip3 for this

```bash
pip install -r requirements.txt
```

<br>

> poster.py uses localhost by default

<details>
<summary> If the project is not running locally </summary>
<br>

Edit poster.py with a tool of your choice

On `line 4`, change the string of the variable `domain` to the domain or IP-address the project is running on

</details>

Run the program
> Python 3 can be python or python3

```bash
python poster.py
```
