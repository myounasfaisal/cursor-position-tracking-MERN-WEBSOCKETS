export const handleMessage=(bytes,uuid,users)=>{
    const message=JSON.parse(bytes.toString());
    const user=users[uuid];
    user.state=message;
    broadcastUsers();
    console.log();
}

export const handleClose=(uuid,connections,users)=>{
delete connections[uuid];
delete users[uuid];
};

export const broadcastUsers=(connections)=>{
        connections.forEach(uuid=>{
        const connection=connections[uuid];
        const message=JSON.stringify(users);
        connection.send(message);
    })
}