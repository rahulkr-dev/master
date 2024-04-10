

const File = ({name}:{name:string})=>{
    return <div>{name}</div>
};


interface folderType {
    name:string,
    children:React.ReactNode
}
const Folder = ({name,children}:folderType)=>{
    return (
        <div>
            <div>{name}</div>
            <div>{children}</div>
        </div>
    )
}

const FileSystem = ()=>{
    return (
        <Folder name="src">
            <Folder name="utils">
                <File name="send-message.ts" />
                <File name="received-message.ts"  />
            </Folder>
        </Folder>
    )
}


export const CompositePattern = ()=>{
    return(
        <FileSystem />
    )
}