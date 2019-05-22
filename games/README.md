# Dir for games and cheat sheet for game engines

Games

* Godot
  * [EMusica](https://github.com/mutsuki333/EMusica)

Engines cheat sheets

* [Godot](#godot)

## Godot
[Step by step Guide](https://docs.godotengine.org/en/3.0/getting_started/step_by_step/index.html)

### Overrideable Function
```GDScript
func _enter_tree():
    # When the node enters the _Scene Tree_, it becomes active
    # and  this function is called. Children nodes have not entered
    # the active scene yet. In general, it's better to use _ready()
    # for most cases.
    pass

func _ready():
    # This function is called after _enter_tree, but it ensures
    # that all children nodes have also entered the _Scene Tree_,
    # and became active.
    pass

func _exit_tree():
    # When the node exits the _Scene Tree_, this function is called.
    # Children nodes have all exited the _Scene Tree_ at this point
    # and all became inactive.
    pass

func _process(delta):
    # This function is called every frame.
    pass

func _physics_process(delta):
    # This is called every physics frame.
    pass
```

### Create/Delete node or scene
```GDScript
# Node
# new
var s
func _ready():
    s = Sprite.new() # Create a new sprite!
    add_child(s) # Add it as a child of this node.

# free
func _someaction():
    s.free() # Immediately removes the node from the scene and frees it.

func _someaction():
    s.queue_free() # Queues the Node for deletion at the end of the current Frame.


# Scene
var scene = load("res://myscene.tscn") # Will load when the script is instanced.
var scene = preload("res://myscene.tscn") # Will load when parsing the script.

# add
var node = scene.instance()
add_child(node)

```

## Issues